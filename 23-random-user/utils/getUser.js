const url = "https://randomuser.me/api/";

const getUser = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const person = data.results[0];
  const { large: image } = person.picture;
  const { first, last } = person.name;
  const { email, phone } = person;
  const {
    dob: { age },
  } = person;
  const {
    street: { number, name },
  } = person.location;
  const { password } = person.login;

  return {
    image,
    name: `${first} ${last}`,
    email,
    phone,
    age,
    password,
    street: `${number} ${name}`,
  };
};

export default getUser;
