import { AnimatedText } from "@/app/components/animated-text";
import { Gap } from "@/app/components/gap";

export const About = () => {
  return (
    <div className="flex min-h-screen items-start gap-10 font-sans">
      <div className="flex flex-row gap-2 md:block -rotate-90 md:rotate-0 text-2xl md:text-7xl w-fit h-fit sticky top-120 font-bold md:pl-20">
        <div>ABOUT</div>
        <div>ME</div>
      </div>
      <section className="min-h-screen  md:pl-40 w-full flex flex-col">
        <article className="border-red-400 border flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <AnimatedText text="Looking for a starting point or more instructions? Head over to" />
          </div>
        </article>
        <Gap size="xl" />
        <article className="border-red-400 border flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <p className="max-w-md text-lg leading-8 text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              center.
            </p>
          </div>
        </article>
        <Gap size="xl" />
      </section>
    </div>
  );
};
