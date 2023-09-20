export async function getClientSubscriptions(clientId: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/api/clients/${clientId}/subscriptions`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return (await res.json()).data[0];
}