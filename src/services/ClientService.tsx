export async function getClients(pageNumber: number, pageSize: number){
    const res = await fetch(`https://bcarddev.tuldok.dev/api/Clients?pageSize=${pageSize}&pageNumber=${pageNumber}`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}