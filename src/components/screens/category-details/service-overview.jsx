const serviceData = [
  {
    title: "Installation Services",
    items: [
      "Pipes, faucets, and fixtures",
      "Water heaters and boilers",
      "Bathroom and kitchen sanitary systems",
    ],
  },
  {
    title: "Repair & Maintenance",
    items: [
      "Leak detection and repair",
      "Water pressure issues",
      "Bathroom and kitchen sanitary systems",
    ],
  },
  {
    title: "Emergency Plumbing",
    items: [
      "24/7 rapid response for urgent issues",
      "Burst pipe repairs",
      "Flooding and water damage control",
    ],
  },
];

const ServiceOverviewSection = ({ services }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-[26px] font-semibold leading-[48px] text-black/75 underline decoration-primary decoration-wavy underline-offset-8">
        Service Overview
      </h3>
      <p className="text-base text-black/60 lg:leading-[32px]">
        Our Plumbing & Sanitary Services are designed to provide comprehensive
        solutions for water supply, drainage, and sanitation needs. We focus on
        delivering reliable, efficient, and sustainable services for
        residential, commercial, and industrial properties. Our licensed
        professionals are equipped with modern tools and techniques to ensure
        safe, hygienic, and functional systems tailored to your requirements.
      </p>
      {serviceData.map((service, index) => (
        <div key={index} className="space-y-1">
          <h5 className="font-body text-base text-black/90 lg:leading-[32px]">
            {service.title}
          </h5>
          <ul className="list-inside list-disc">
            {service.items.map((item, idx) => (
              <li
                key={idx}
                className="pl-6 text-base text-black/60 lg:leading-[32px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceOverviewSection;
