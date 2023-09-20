import { AddCompany, Company } from "@/models/Company";

export async function getClients(pageNumber: number, pageSize: number){
    const res = await fetch(`${process.env.apiBaseURI}/api/Clients?pageSize=${pageSize}&pageNumber=${pageNumber}`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
   
    return (await res.json()).data[0];
}

export async function getClient(id: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/api/Clients/${id}`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return (await res.json()).data[0];
}

export async function addClient(company: AddCompany){
    var requestOptions = {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(company)
    };

    const res = await fetch(`${process.env.apiBaseURI}/api/Clients`, requestOptions);

    if(!res.ok){
        throw new Error()
    }

    res.json();
}


export async function getClientMembers(id: string){
    const res = await fetch(`${process.env.apiBaseURI}/api/clients/${id}/members`);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return (await res.json()).data[0];
}