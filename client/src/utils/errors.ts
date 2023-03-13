export const handleError = async (type: string, setter: any) => {
  const errTypes: { [key: string]: string } = {
    length:
      "Your meep must be greater than 0 and fewer than 66 characters long.",
    duplicateUser: "A user is already registered under this email address!",
    wrongPassword: "The password you entered appears to be incorrect...",
    badEmail: "The format of the input email fails validation!"
  };
  setter(errTypes[type]);
  return setTimeout(() => setter(""), 5000);
};

export const validators = async (type: string, input: string) => {
  const types: { [key: string]: () => boolean } = {
    email: () => {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(input);
    }
  };
  return types[type];
};
