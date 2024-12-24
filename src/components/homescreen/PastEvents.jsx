import { motion } from "framer-motion";
import React from "react";

export default function PastEvents() {
  return (
    <main className="h-full w-full  max-w-7xl mx-auto py-8">
      <div className="relative w-fit mx-auto mb-16">
        <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
        <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
        <h1 className="text-center font-bold text-5xl">
          Past <span className="text-red-700">Events</span>
        </h1>
      </div>
      <section
        className="h-full w-full gap-12  flex flex-col
        min-[800px]:flex-row mx-auto py-12 px-4"
      >
        <div className="w-full hidden min-[1180px]:flex  min-[1230px]:pr-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="border rounded-2xl h-full w-full"
          ></motion.div>
        </div>
        <div className="flex flex-1  flex-col items-end">
          <div className="flex flex-col w-full min-[800px]:max-w-96 pt-3 pb-6">
            <h2 className="text-3xl font-semibold">
              Pas<span className="text-red-600">t Ev</span>
              ents
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              voluptatibus voluptatem assumenda tempora accusantium doloremque
              omnis perspiciatis quidem{" "}
            </p>
          </div>
          <div
            className="aspect-[16/11]  w-full lg:w-96 bg-slate-700 rounded-2xl
                flex items-end
                p-4
                "
          >
            <div className=" h-fit">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                minus molestiae dolores temporibus ratione. molestiae dolores
                temporibus ratione.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-1 flex-col gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-2xl flex items-end p-4"
          >
            <div className="h-fit">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                minus molestiae dolores temporibus ratione. molestiae dolores
                temporibus ratione.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11]  w-full lg:w-96 bg-slate-700 rounded-xl flex items-end p-4"
          >
            <div className="h-fit">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                minus molestiae dolores temporibus ratione. molestiae dolores
                temporibus ratione.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
