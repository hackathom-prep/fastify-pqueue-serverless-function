import Fastify from "fastify";
import PQueue from "p-queue";

const fastify = Fastify();

const keys = {
  KEY1: true,
  KEY2: true,
  KEY3: true,
  KEY4: true,
  KEY5: true,
  KEY6: true,
  KEY7: true,
  KEY8: true,
  KEY9: true,
  KEY10: true,
};

const queue = new PQueue({ concurrency: 10 });

fastify.post("/simulate", async (req, reply) => {
  return queue.add(async () => {
    const key = Object.keys(keys).find((k) => keys[k]);
    keys[key] = false;
    console.log("Using key:", key);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    keys[key] = true;
    return { message: `Processed with ${key}` };
  });
});

// development
// fastify.listen({ port: 3000 });

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}
