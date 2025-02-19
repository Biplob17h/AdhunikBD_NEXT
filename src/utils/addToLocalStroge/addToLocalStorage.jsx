export const handleAddToLocalStorage = (service) => {
  const services = JSON.parse(localStorage.getItem("AdhunikServices") || "[]");

  // Check if the service already exists in the local storage
  if (!services.some((s) => s.serviceId === service.serviceId)) {
    services.push(service);
    localStorage.setItem("AdhunikServices", JSON.stringify(services));
  } else {
    alert("Service already exists in the list!");
  }
};


