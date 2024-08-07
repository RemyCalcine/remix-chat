export const createCustomer = async ({email, name}: any) => {
    return await prisma.customers.create({
        data: {
            id: '12345',
            email: email,
            name: name
        } as any
    });
}