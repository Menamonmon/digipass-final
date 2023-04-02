import { performance } from "perf_hooks";

export default async function prismaLogger(params, next) {
  const queryTime = new Date();
  const before = performance.now();

  const result = await next(params);

  const after = performance.now();

  console.log(
    `(${queryTime.toISOString()}) -- query ${params.model}.${params.action} took ${
      (after - before).toFixed(5)
    }ms`
  );

  return result;
}
