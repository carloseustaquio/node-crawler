
import { performance } from "perf_hooks"

export class PerformanceStats {
  private t0: any
  private t1: any

  start() {
    console.log("Starting crawler...")
    this.t0 = performance.now()
  }

  stop() {
    this.t1 = performance.now()
    console.info(`\nDone in ${((this.t1 - this.t0) / 1000.0).toFixed(2)} s.\n`);
  }
}

