# Quirks Mobile dApp Starter

This repo provides a starter for using [quirks](https://github.com/nabla-studio/quirks) on react native.

## ⚙️ Stack

- Expo
- Quirks
- Expo Router

## 🪄 Features

- Android & iOS support
- Web support
- Crypto API support

## 🔧 Installation

Node.js is required to run the project.

1. Clone the repository to your local machine:

```bash
git clone https://github.com/nabla-studio/quirks-mobile-dapp-starter.git
```

2. Install the dependencies:

```bash
cd quirks-mobile-dapp-starter
bun i
```

3. Setup env file:

```bash
cp .env .env.development.local
```

4. Open your env file and add wallet connect setup:

```bash
EXPO_PUBLIC_WC_PROJECT_ID=<YOUR-PROJECT-ID>
```

5. Start expo dev server:

```bash
bun start
```

6. Start native projects:

    - **Android**
    ```bash
    bun android
    ```
    - **iOS**
    ```bash
    bun ios
    ```

## 👥 Authors

👤 **Davide Segullo** (Code)

- Github: [@DavideSegullo](https://github.com/DavideSegullo)
- Twitter: [@davide_segullo](https://twitter.com/davide_segullo)

## 🎉 Contributing

We ❤️ contributions! If you'd like to contribute, please read our contributing
guidelines.

## 🙋 Support

If you have any questions or comments about this project, please feel free to
contact us on discord.

Copyright © 2024 [nabla](https://github.com/nabla-studio).