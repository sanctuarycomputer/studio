## Hashes

A hash function is unidirectional. Conversely, an encryption function is a bidirectional. An encrypted value can be reversed to get the original value back. A hash CANNOT be reversed, it can only be used to verify the original value.

```
hash(a) == hash(a)
```

```
a == b
hash(a) == hash(b)
```

```
a != b
hash(a) != hash(b)
```

#### Collisions

Good hashing algorithms are designed to have as little _collisions_ as possible. A collision is when two different values results in the same hashed value.

#### Slightly Different Input ~> Completely Different Output

Good hashing algorithms are designed so that any tiny change in the input will result in a _completely_ different output. There should be no correlation between input and output, only that the same input results in the same output _every single time_.

#### Use cases

###### Checksums

Hashes are used to verify the contents of downloaded files. The file's contents are run through a hashing algorithm (most often SHA-256) and the output is posted online. When you download a file with a checksum, you can run the downloaded file through the same hashing algorithm and if it matches the posted checksum you know the file is exactly what the author intended. Downloaded completely and has not been tampered with.

###### Comparing passwords

Actual passwords _should_ never be stored in a database, only their hashed values. We use these hashed values to compare user input with values in the database. If the hashed values match, we know that the user inputted password matches the stored password, BUT if the database were comprised, we wouldn't be leaking user's emails and passwords and the data would be useless. The hacker would _still_ not be able to login as the user.

In this case, these hashing algorithms are often designed to be somewhat slow (like bcrypt), to prevent against rainbow table attacks. Rainbow table attacks are when each value (starting from `a` to `zzzzzzzzzzzzzzzzzzz`) are used as an input in a hashing algorithm and the results are saved to look up agsint. This is why long passwords are _SO_ much more secure than shorter ones.

> Now all you need to know is that to crack a hash with n bits of entropy, on average you need to try 2n-1 times. So take a password consisting of 8 random lower case letters for instance. It has an entropy of n = log2(268) = 38 bits. To crack it you would need 238-1/1000 seconds = 4 years. Note that the benchmark is from 2016. As time passes by, hardware gets faster. You will need to regularly reevaluate your cost factor to stay up to date.

- (https://security.stackexchange.com/questions/182111/mathematically-how-long-would-it-take-to-crack-a-bcrypt-password-hash/182116)

Salts further prevents against a rainbow attack. Salts are randomly generated when we save a new password. Salting a password looks like this:

- User sends their email and password to sign up.
- We randomly generate a salt (some random 64 character string for example).
- We run the following:

```
salt = random()
hashed_salt_and_password = hash(salt + password)
value_for_database = salt + hashed_salt_and_password
```

- We have now obscured the password even more.
- All users with password `Password1` will no longer be prone to a rainbow table attack.

Verifying passwords is as follows:

- Split the salt off the value stored in the database (we know it is the first 64 characters) so `salt = substr(value_from_database, 64)`
- Hash the user input plus salt: `hash(user_input + salt)`
- Compare `salt + hashed_user_input_and_salt === value_from_database)`
- If it equals, it's the same value. If not, it's not.

###### Performant Data Structures

Hashes are used for writing performant data structures, such as the hash table — sometimes referred to as an object (in js), as a dictionary (in python), a hash (in ruby), etc... The implementation differs from browser to browser and from runtime to runtime, but most likely the underlying data structure is an array (or list) where keys are hashed to numbers and stored in that position in the array. These hashing algorithms are designed to prioritize speed first, because collisions, while still extremely unlikely, are not a security vulnerability and can be solved for.

_Javascript/Ecmascript, is just a standard, not an implementation. Each browser/javascript engine implements javascript and it's underlying data structures in completely different ways._

###### Let's make a hash table from scratch in JS!

#### `const hash = new SanctuHashu()`
