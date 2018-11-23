const mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO check if they are logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    }
    // createDog(parent, args, ctx, info) {
    //     global.dogs = global.dogs || [];
    //     const newDog = {name: args.name};
    //     global.dogs = [...global.dogs, newDog];
    //     console.log(args);
    //     return newDog;
    // }
};

module.exports = mutations;
