export async function apiRegister(request, user) {
  const response = await request.post(
    'https://api.practicesoftwaretesting.com/users/register',
    {
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        date_of_birth: user.dateOfBirthday,
        street: user.street,
        postal_code: user.postalCode,
        city: user.city,
        state: user.state,
        country: user.country,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
    }
  );

  return response;
}
