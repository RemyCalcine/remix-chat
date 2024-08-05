import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

// Use API Rest in this example
export const loader: LoaderFunction = async ({ request }) => {

    const { session, admin } = await authenticate.admin(request);

    try {
        const response = await admin.rest.resources.InventoryLevel.all({
            session: session,
            location_ids: '99825516890'
        });

        if (response) {
            console.log('hit');

            const data = response.data;

            console.log(data, 'data');

            return data;
        }

    } catch(err){
        console.log(err)
    }
    
}

// Render collections in Admin page
const Inventory = () => {
    const data: any = useLoaderData();

    console.log(data, 'data 2')


  return (<Page>
    <Layout>
        <Layout.Section>
            <Card><h1>My Inventory</h1></Card>
        </Layout.Section>
    </Layout>
  </Page>);
};


export default Inventory;