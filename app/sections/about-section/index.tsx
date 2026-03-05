import { AnimatedHeader } from "@/app/components/animated-header";
import { AnimatedText } from "@/app/components/animated-text";
import { Gap } from "@/app/components/gap";

export const About = () => {
  return (
    <div className="min-h-screen items-start gap-10 font-sans">
      <AnimatedHeader
        title="About Me"
        subtitle="get to know me"
        withScrollTrigger
      />
      <section className="min-h-screen mt-40  md:pl-40 w-full flex flex-col">
        <article className="border-red-400 border flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <AnimatedText text="Looking for a starting point or more instructions? Head over to" />
          </div>
        </article>
        <Gap size="xl" />
        <article className="border-red-400 border flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
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
