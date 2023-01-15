import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import config from '../../config';
import { Link } from 'react-router-dom';

interface TailDetails {
    name: string;
    code: string;
    nft_uri: string;
}

export type SearchIndex = {
    search_index: Record<string, string[]>;
    hashes: Record<string, TailDetails>;
};

type SearchIndexProps = {
    searchIndex: SearchIndex;
};

const Search = ({ searchIndex }: SearchIndexProps) => {
    const [results, setResults] = useState<(TailDetails & { hash: string })[]>([]);
    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerms = event.target.value.toLowerCase();

        setResults(
            searchTerms
                .split(' ')
                .reduce<string[]>(
                    (accum, searchTerm) => [...new Set([...accum, ...searchIndex.search_index[searchTerm]])],
                    []
                )
                .map((hash) => ({
                    hash,
                    ...searchIndex.hashes[hash],
                }))
        );
    };

    return (
        <section className="hero-4 pb-5 pt-7 py-sm-7 bg-gradient2">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7} className="text-center">
                        <h1 className="hero-title">Explore</h1>
                        <p className="fs-17 text-muted">Search by Asset ID, Name, or Code</p>

                        <div className="mt-5">
                            <div className="form-control-with-hint">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="query"
                                    name="query"
                                    placeholder="Search..."
                                    onChange={search}
                                />
                                <span className="form-control-feedback">
                                    <FeatherIcon className="icon-xs" icon="search" />
                                </span>
                            </div>
                        </div>

                        {results.length > 0 && (
                            <div className="mt-5">
                                <h3>Search results</h3>
                                <ul className="list-inline mt-3 mb-4 mb-lg-0">
                                    {results.map((result) => (
                                        <li className="list-inline-item me-4 mb-2" key={result.hash}>
                                            <Link to={`/tail/${result.hash}`}>
                                                {result.name} ({result.code})
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Search;
