import React from 'react'

export default function InsightCard({ data }) {
    if (!data) return <></>;
    return (
        <>
            {data?.map((e, index) => {
                return (
                    <div>
                        <Image/>
                        <p></p>
                        <p></p>
                    </div>
                );
            })}
        </>
    )
}