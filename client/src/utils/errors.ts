export const handleError = async (type: string, setter: any) => {
  const errTypes: { [key: string]: string } = {
    length:
      "Your meep must be greater than 0 and fewer than 66 characters long."
  };
  setter(errTypes[type]);
  return setTimeout(() => setter(""), 3000);
};
