import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, Page } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";

export const query = `
{
    collections(first: 10){
        edges{
            node{
                id
                handle
                title
                description
            }
        }
        pageInfo {
            hasNextPage
        }
    }
}
`;

export const loader: LoaderFunction = async ({request}) => {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    try {
        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/graphql',
                "X-Shopify-Access-Token": accessToken!
            },
            body: query
        });

        if(response.ok) {
            const data = await response.json();

            const {
                data: {
                    collections: { edges }
                }
            } = data;

            return edges;
        }

        return null;
    } catch(error) {
        console.error(error);

        return null;
    }
}

const Collections = () => {
    const collections: any = useLoaderData();
    console.log(collections, 'collections');

  return (
    <Page>
        <Layout>
            <Layout.Section>
                <Card><h1>Hello !</h1></Card>
            </Layout.Section>
        </Layout>
    </Page>
  )
}

export default Collections;