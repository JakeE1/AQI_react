const privateResolver = resolverFunction => async (
    parent,
    args,
    context,
    info
  ) => {
    console.log('check', args);
    if (!context.req.user) {
      throw new Error("No JWT. Refuse to proceed");
    }
    const resolved = await resolverFunction(parent, args, context, info);
    return resolved;
  };
  
  export default privateResolver;