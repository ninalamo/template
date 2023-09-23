"use client"


import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { generateClientCards } from '@/services/SubscriptionService';

const formSchema = z.object({
    count: z.coerce.number().min(1, "Card count should not be less than one.")
})


export default function GenerateCardForm({
    clientId,
    subscriptionId
}: {
    clientId: string,
    subscriptionId: string
}){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            count: 0
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values);

        const created = await generateClientCards(clientId, subscriptionId, values.count);

        console.log(created);
    }


    return (
        <div className='my-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                        <FormItem className='mb-3'>
                        <FormLabel>Card Count</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}