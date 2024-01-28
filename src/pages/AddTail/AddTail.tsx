import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FeatherIcon from 'feather-icons-react';
import { convertbits, decode } from 'chia/bech32';
import config from 'config';
import { FormInput } from 'components/form';
import { useWalletConnectClient } from '../../walletconnect/contexts/ClientContext';
import { useJsonRpc } from '../../walletconnect/contexts/JsonRpcContext';
import WalletConnect from 'components/WalletConnect';

const CATEGORIES = ['gaming', 'event', 'education', 'meme', 'stablecoin', 'wrapped', 'platform'];

const AddTail = () => {
    const [inserted, setInserted] = useState(false);
    const [failedMessage, setFailedMessage] = useState('');
    const [signatureAddress, setSignatureAddress] = useState('');
    const [signatureMessage, setSignatureMessage] = useState('');
    const [signed, setSigned] = useState(false);
    const [formData, setFormData] = useState<any>(false);
    const [modal, setModal] = useState('');
    const [hash, setHash] = useState('');
    const [coinId, setCoinId] = useState('');

    const { accounts } = useWalletConnectClient();
    const { chiaRpc, rpcResult } = useJsonRpc();

    useEffect(() => {
        if (hash.length === 64) {
            (async() => {
                const cat_info = await axios.get(`${config.SPACESCAN_CAT_URL}/${hash}?authkey=tkn1qqqksxykg7zgp63c2ze3h3jxx683ahah6vathvcksxykg7zgqqqqy0gg6j&version=0.1.0&network=mainnet`);

                if (cat_info.data && cat_info.data.status === 'success' && cat_info.data.data.length > 0) {
                    const { coin_name } = cat_info.data.data[cat_info.data.tokens.length - 1];
                    const reveal = await axios.get(`${config.REVEAL_URL}/${coin_name}`);

                    if (reveal.data) {
                        const { eve_coin_id } = reveal.data;

                        setCoinId(eve_coin_id);
                    }
                }
            })();
        } else {
            setCoinId('');
        }
    }, [hash]);

    const onHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 64) {
            setHash(event.target.value);
        } else {
            setHash('');
            setSignatureAddress('');
            setSignatureMessage('');
        }
    };
    const onCoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 64) {
            setCoinId(event.target.value);
        } else {
            setCoinId('');
            setSignatureAddress('');
            setSignatureMessage('');
            setFailedMessage('');
        }
    };

    useEffect(() => {
        (async () => {
            if (hash.length == 64 && coinId.length == 64) {
                try {
                    const response = await axios.post(`${config.AUTH_URL}/${hash}`, { coinId });

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
    }, [hash, coinId]);

    // form validation schema
    const schemaResolver = yupResolver(
        yup.object().shape({
            hash: yup.string().length(64).required('Please enter hash'),
            name: yup.string().min(1).max(100).required('Please enter name'),
            code: yup.string().min(1).max(5).required('Please enter code'),
            category: yup.string().oneOf(CATEGORIES).required('Please select category'),
            coin: yup.string().length(64).optional(),
            logo: yup.string().length(62).required('Please enter NFT ID'),
            website_url: yup.string().optional().url(),
            twitter_url: yup.string().optional().url(),
            discord_url: yup.string().optional().url(),
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
                        const response = await axios.post(
                            config.ADD_TAIL_URL,
                            {
                                ...formData,
                                eveCoinId: coinId
                            },
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
        hash,
        name,
        code,
        logo,
        coin,
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
            hash,
            name,
            code,
            category,
            description,
            launcherId,
            eveCoinId: coin,
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
                                                            onChange={onHashChange}
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
                                                            onChange={onCoinChange}
                                                            value={coinId}
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

export default AddTail;
