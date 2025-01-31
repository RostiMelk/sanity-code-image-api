import image from "./routes/image";
async function app(instance, opts, done) {
    instance.get("/", async (req, res) => {
        res.status(200).send({ hello: "World" });
    });
    instance.register(image);
    done();
}
export default app;
