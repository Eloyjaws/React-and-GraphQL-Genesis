const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO check if they are logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        const updates = {...args};
        //remove id
        delete updates.id;
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        , info})
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        //find the item
        const item = await ctx.db.query.item({where}, 
        `{
            id 
            title
        }`)
        //check if they have the permissions to delete it
        // TODO
        //delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },
    async signUp(parent, args, ctx, info) {
        //lowercase the email address
        args.email = args.email.toLowerCase();
        //hash their password
        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.db.mutation.createUser({
            data: {...args, password, permissions: {set: ['USER']}}
        }, info);

        const token = jwt.sign({userId: user.id,}, process.env.APP_SECRET);
        //set a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: 'true',
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
        })

        //return user
        return user;
    }
};

module.exports = mutations;
