import { Outlet, createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <div className="flex gap-x-4 h-screen w-full max-w-screen-2xl mx-auto">
      <section className="rounded-2xl p-4 hidden lg:flex">
        <picture className="bg-cover">
          <source
            srcSet="https://via.placeholder.com/1920x1080.webp"
            type="image/webp"
          />
          <source
            srcSet="https://via.placeholder.com/1920x1080.jpg"
            type="image/jpeg"
          />
          <img
            src="https://via.placeholder.com/1920x1080.jpg"
            alt="A placeholder"
            className="w-full h-full rounded-2xl object-cover"
          />
        </picture>
      </section>

      <div className="flex flex-col w-full gap-y-8 items-center justify-center">
        <b className="text-2xl tracking-wide">Blazar</b>
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout/_sign")({
  component: Index,
});
