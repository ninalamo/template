export async function getClients(pageNumber: number, pageSize: number){
    const res = await fetch(`${process.env.apiBaseURI}/api/Clients?pageSize=${pageSize}&pageNumber=${pageNumber}`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getClient(id: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/api/Clients/${id}`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}