import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FeatherIcon from 'feather-icons-react';
import { convertbits, decode, encode } from 'chia/bech32';
import config from 'config';
import { Tail } from '../Tail/types';
import { useJsonRpc } from 'walletconnect/contexts/JsonRpcContext';
import { FormInput } from 'components/form';
import { useWalletConnectClient } from 'walletconnect/contexts/ClientContext';
import WalletConnect from 'components/WalletConnect';

const CATEGORIES = ['gaming', 'event', 'education', 'meme', 'stablecoin', 'wrapped', 'platform'];

const UpdateTail = ({ tail }: { tail: Tail }) => {
    const [inserted, setInserted] = useState(false);
    const [failedMessage, setFailedMessage] = useState('');
    const [signatureAddress, setSignatureAddress] = useState('');
    const [signatureMessage, setSignatureMessage] = useState('');
    const [signed, setSigned] = useState(false);
    const [formData, setFormData] = useState<any>(false);
    const [modal, setModal] = useState('');

    const { accounts } = useWalletConnectClient();
    const { chiaRpc, rpcResult } = useJsonRpc();

    const hexToBytes = (hex: string): number[] => {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substr(c, 2), 16));
        }

        return bytes;
    };

    const nftId = (launcherId: string): string => {
        if (!launcherId) {
            return '';
        }

        const data = convertbits(hexToBytes(launcherId), 8, 5);

        if (data) {
            const address = encode('nft', data, 'bech32m');

            return address;
        }

        return '';
    };

    useEffect(() => {
        (async () => {
            if (tail.hash && tail.eve_coin_id) {
                try {
                    const response = await axios.post(`${config.AUTH_URL}/${tail.hash}`, { coinId: tail.eve_coin_id });

                    const { address, message } = response.data;

                    if (address && message) {
                        setSignatureAddress(address);
                        setSignatureMessage(message);
                        setFailedMessage('');
                    } else {
                        setSignatureAddress('');
                        setSignatureMessage('');
                        setFailedMessage('');
                    }
                } catch (err: any) {
                    console.error(err);
                    setFailedMessage(err);
                    setSignatureAddress('');
                    setSignatureMessage('');
                }
            }
        })();
    }, [tail]);

    // form validation schema
    const schemaResolver = yupResolver(
        yup.object().shape({
            hash: yup.string().length(64).required('Please enter hash').default(tail.hash),
            name: yup.string().min(1).max(100).required('Please enter name').default(tail.name),
            code: yup.string().min(1).max(5).required('Please enter code').default(tail.code),
            category: yup.string().oneOf(CATEGORIES).required('Please select category').default(tail.category),
            coin: yup.string().length(64).required('Please enter Coin ID').default(tail.eve_coin_id),
            logo: yup.string().length(62).required('Please enter NFT ID').default(nftId(tail.launcher_id)),
            website_url: yup.string().optional().url().default(tail.website_url),
            twitter_url: yup.string().optional().url().default(tail.twitter_url),
            discord_url: yup.string().optional().url().default(tail.discord_url),
        })
    );

    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (signed) {
            const valid = (rpcResult as any).valid;

            if (valid && formData) {
                setFailedMessage('');

                const { data: { signature } } = JSON.parse((rpcResult as any).result);

                (async () => {
                    try {
                        const response = await axios.patch(
                            config.ADD_TAIL_URL,
                            formData,
                            { headers: { 'x-chia-signature': signature } }
                        );

                        const { tx_id, error } = response.data;

                        if (tx_id) {
                            setInserted(true);
                            setFailedMessage('');
                        } else {
                            setInserted(false);
                            if (error) {
                                setFailedMessage(error);
                            } else {
                                setFailedMessage(
                                    'Failed to submit TAIL record to mempool. You can only submit the same TAIL hash once. If you recently submitted a record you must wait for it to clear before submitting another.'
                                );
                            }
                        }
                    } catch (err: any) {
                        console.error(err);
                        setFailedMessage(err);
                    }
                })();


            } else if (!valid && !formData) {
                setInserted(false);
                setFailedMessage('Failed to sign message');
            } else {
                setInserted(false);
                setFailedMessage('Failed to sign message');
            }

        }
    }, [signed, formData]);

    const onSubmit: SubmitHandler<FieldValues> = async ({
        name,
        code,
        logo,
        category,
        description,
        website_url,
        twitter_url,
        discord_url,
    }) => {
        setFormData(false);
        setInserted(false);
        setFailedMessage('');
        setSigned(false);

        const decode_result = decode(logo, 'bech32m');

        if (!decode_result) {
            setInserted(false);
            setFailedMessage('Invalid NFT ID');

            return;
        }

        const launcher_id_raw = convertbits(decode_result.data, 5, 8, false);

        if (!launcher_id_raw) {
            setInserted(false);
            setFailedMessage('Invalid NFT ID');

            return;
        }

        const launcherId = launcher_id_raw.map((n) => n.toString(16).padStart(2, '0')).join('');

        const account = accounts[0];
        const [namespace, reference, fingerprint] = account.split(":");
        const chainId = `${namespace}:${reference}`;

        setModal('request');

        try {
            await chiaRpc.signMessageByAddress(chainId, fingerprint, signatureMessage, signatureAddress);
        } catch (err) {
            console.log(err);

            setSigned(false);
            setInserted(false);
            setFailedMessage('Failed to sign message');

            return;
        } finally {
            setModal('');
        }

        setSigned(true);
        setFormData({
            hash: tail.hash,
            name,
            code,
            category,
            description,
            launcherId,
            eveCoinId: tail.eve_coin_id,
            ...(website_url ? { website_url } : {}),
            ...(twitter_url ? { twitter_url } : {}),
            ...(discord_url ? { discord_url } : {}),
        });
    };

    return (
        <section className="section pb-lg-7 py-4 position-relative">
            <Container>
                {accounts.length === 0 && (
                    <>
                    <h3>Not connected to wallet</h3>
                    <p>
                        You need to connect to your wallet using WalletConnect to continue.
                    </p>
                    <WalletConnect />
                </>
                )}
                {accounts.length > 0 && modal == 'request' && (
                    <>
                        <h3>Pending JSON-RPC Request</h3>
                        <p>
                            Approve or reject request using your wallet
                        </p>
                    </>
                )}
                {accounts.length > 0 && modal == '' && (
                    <>
                        {inserted && <>TAIL record submitted to mempool</>}
                        {!inserted && (
                            <Row className="align-items-center">
                                <Col lg={12} style={{ color: 'red' }}>
                                    When you add or update details in Tail Database the update is applied to DataLayer however
                                    this website is only updated once every 10 minutes. If you use the Tail Database standalone
                                    application you can see updates quicker as that updates more frequently.
                                </Col>
                                <Col lg={12}>
                                    <Card className="shadow-none">
                                        {failedMessage && (
                                            <div className="alert alert-danger" role="alert">
                                                {failedMessage}
                                            </div>
                                        )}
                                        <Card.Body className="p-xl-5 p-0">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="hash"
                                                            name="hash"
                                                            label="Asset ID"
                                                            placeholder="Asset ID"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.hash}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="name"
                                                            name="name"
                                                            label="Name"
                                                            placeholder="Name"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.name}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="code"
                                                            name="code"
                                                            label="Code"
                                                            placeholder="Code"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.code}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="logo"
                                                            name="logo"
                                                            label="Logo NFT ID"
                                                            placeholder="Logo NFT ID"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={nftId(tail.launcher_id)}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="coin"
                                                            name="coin"
                                                            label="CAT Coin ID"
                                                            placeholder="CAT Coin ID"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.eve_coin_id}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="website_url"
                                                            name="website_url"
                                                            label="Website URL"
                                                            placeholder="Website URL"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.website_url}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="twitter_url"
                                                            name="twitter_url"
                                                            label="Twitter URL"
                                                            placeholder="Twitter URL"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.twitter_url}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="discord_url"
                                                            name="discord_url"
                                                            label="Discord URL"
                                                            placeholder="Discord URL"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.discord_url}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="select"
                                                            name="category"
                                                            label="Category"
                                                            placeholder="Category"
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.category}
                                                        >
                                                            <option value="option_select0">Category</option>
                                                            {CATEGORIES.map((category) => (
                                                                <option value={category} key={category}>
                                                                    {category}
                                                                </option>
                                                            ))}
                                                        </FormInput>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <FormInput
                                                            type="textarea"
                                                            name="description"
                                                            label="Description"
                                                            placeholder="Type Your description..."
                                                            rows={5}
                                                            containerClass={'mb-3'}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            defaultValue={tail.description}
                                                        />
                                                    </Col>
                                                    <Col lg={12}>
                                                        <h4>Authorization</h4>
                                                        <p>
                                                            To make this change you need to sign a message using the wallet
                                                            which minted the CAT. You should run a chia wallet that uses the correct keys
                                                            and we will connect with WalletConnect to sign the message. Manually inspect
                                                            the message that is being signed to be confirm it's not a malicious transaction.
                                                        </p>
                                                    </Col>
                                                    <Col lg="auto" className="mb-0">
                                                        <Button type="submit" disabled={!signatureAddress || !signatureMessage}>
                                                            Add
                                                            <span className="icon icon-xs text-white ms-1">
                                                                <FeatherIcon icon="plus-circle" />
                                                            </span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </>
                )}

            </Container>
        </section>
    );
};

export default UpdateTail;
