/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import styles from './DonkiComponent.module.css'; // Import your styles
import services from '../services';

const DonkiComponent = () => {
    const [apiType, setApiType] = useState('CME');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiOptions = [
        'Coronal Mass Ejection (CME)', 'Coronal Mass Ejection (CME) Analysis', 'Geomagnetic Storm (GST)', 'Interplanetary Shock (IPS)', 'Solar Flare (FLR)', 'Solar Energetic Particle (SEP)', 
        'Magnetopause Crossing (MPC)', 'Radiation Belt Enhancement (RBE)', 'Hight Speed Stream (HSS)', 'WSA+EnlilSimulation', 'Notifications'
    ];

    const handleFetchData = async () => {
        if (!startDate || !endDate) {
            alert('Please enter both start and end dates.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await services.NASAAPIService.fetchDonkiData(apiType, { startDate, endDate });
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.donkiContainer}>
            <h2 className={styles.heading}> Space Weather Database Of Notifications, Knowledge, Information (DONKI)</h2>

            <label className={styles.label}>
                Select API Type:
                <select className={styles.select} value={apiType} onChange={(e) => setApiType(e.target.value)}>
                    {apiOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.label}>
                Start Date:
                <input className={styles.input} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>

            <label className={styles.label}>
                End Date:
                <input className={styles.input} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>

            <button className={styles.button} onClick={handleFetchData} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Data'}
            </button>

            {error && <p className={styles.error}>Error: {error}</p>}

            <div className={styles.results}>
                <h3>Results:</h3>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className={styles.resultCard}>
                            <h4>{item.activityID}</h4>
                            <p><strong>Start Time:</strong> {item.startTime}</p>
                            <p><strong>Catalog:</strong> {item.catalog}</p>
                            <p><strong>Source Location:</strong> {item.sourceLocation}</p>
                            <p><strong>Active Region:</strong> {item.activeRegionNum}</p>
                            <p><strong>Notes:</strong> {item.note}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                View More Details
                            </a>

                            {/* Instruments */}
                            <h5>Instruments:</h5>
                            <ul>
                                {item.instruments?.map((inst: any, i: number) => (
                                    <li key={i}>{inst.displayName}</li>
                                ))}
                            </ul>

                            {/* CME Analysis */}
                            {item.cmeAnalyses && item.cmeAnalyses.length > 0 && (
                                <div>
                                    <h5>CME Analysis:</h5>
                                    {item.cmeAnalyses.map((cme: any, j: number) => (
                                        <div key={j} className={styles.cmeAnalysis}>
                                            <p><strong>Latitude:</strong> {cme.latitude}</p>
                                            <p><strong>Longitude:</strong> {cme.longitude}</p>
                                            <p><strong>Speed:</strong> {cme.speed} km/s</p>
                                            <p><strong>Half Angle:</strong> {cme.halfAngle}°</p>
                                            <p><strong>Type:</strong> {cme.type}</p>
                                            <a href={cme.link} target="_blank" rel="noopener noreferrer">
                                                View CME Analysis
                                            </a>

                                            {/* Impact List */}
                                            {cme.enlilList && cme.enlilList.length > 0 && (
                                                <div>
                                                    <h5>Impact Predictions:</h5>
                                                    {cme.enlilList.map((enlil: any, k: number) => (
                                                        <div key={k} className={styles.impactDetails}>
                                                            <p><strong>Model Completion:</strong> {enlil.modelCompletionTime}</p>
                                                            {enlil.impactList.map((impact: any, m: number) => (
                                                                <p key={m}>
                                                                    <strong>Impact Location:</strong> {impact.location} - 
                                                                    <strong> Arrival:</strong> {impact.arrivalTime}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default DonkiComponent;
