function createRouteHandler(createResource) {
  return async (req, res) => {
    const result = await createResource(req, res);

    res.status(result.success ? 200 : 400).json(result);
  };
}

export default createRouteHandler;
