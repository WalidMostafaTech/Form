const EventSteps = ({ steps = [] }) => {
  return (
    <section>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {steps?.map((item, index) => (
          <li
            key={item.id}
            className="space-y-2 bg-primary text-white p-4 px-8 rounded-lg shadow"
          >
            <h3 className="text-2xl text-center font-semibold">{item.title}</h3>

            <div className="flex items-center gap-2">
              <div
                className="w-16 aspect-square bg-white/10 rounded-lg
              flex items-center justify-center text-secondary text-3xl"
              >
                {index + 1}
              </div>
              <p className="flex-1 text-xs">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventSteps;
