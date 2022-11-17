import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import config from '../../config';
import { Link } from 'react-router-dom';

export type SearchIndex = Record<string, string[]>;

type SearchIndexProps = {
    searchIndex: SearchIndex;
}

const Search = ({ searchIndex }: SearchIndexProps) => {
    const [results, setResults] = useState<string[]>([]);
    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerms = event.target.value.toLowerCase();

        setResults(
            searchTerms
                .split(' ')
                .reduce<string[]>(
                    (accum, searchTerm) =>
                        [...new Set([...accum, ...searchIndex[searchTerm]])],
                        []
                )
        );
    };


    return (
        <section className="hero-4 pb-5 pt-7 py-sm-7 bg-gradient2">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7} className="text-center">
                        <h1 className="hero-title">Explore</h1>
                        <p className="fs-17 text-muted">
                            Search by Asset ID, Name, or Code
                        </p>

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
                                <ul>
                                    {results.map(result => (
                                        <li><Link to={`/tail/${result}`}>{result}</Link></li>
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
