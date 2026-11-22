# Frontend - Gestión de Suscripciones Gimnasio (SaaS)

**Alumno:** Yuliss
**Red:** Solana Devnet

## Descripción
Este es el frontend del proyecto final del Advanced Bootcamp de Solana. Se trata de una interfaz web moderna construida con **React + Vite** que permite a los usuarios interactuar con el contrato inteligente (Smart Contract) del gimnasio desplegado en Devnet.

## Características
*   **Conexión Wallet:** Integración con `@solana/wallet-adapter` para conectar la Phantom Wallet en la red Devnet.
*   **Interfaz Interactiva:** Los usuarios pueden ingresar su ID y seleccionar entre 3 planes (Básico, Pro, Premium) mediante tarjetas visuales.
*   **Envío de Transacciones Reales:** La interfaz construye y envía transacciones reales a la blockchain usando `@solana/web3.js`, llamando directamente a la instrucción `suscribirse` del programa.
*   **Diseño Moderno:** Interfaz limpia, responsiva y con un diseño atractivo tipo Web3.

## Evidencia
<img width="1025" height="917" alt="Captura de pantalla 2026-11-22 115308" src="https://github.com/user-attachments/assets/c8d733d8-e240-48fd-bc82-f8e9a5ef1895" />

## Repositorios del Proyecto
*   **Frontend (Este repositorio):** [https://github.com/yuliss-vs/suscripciones-gym-frontend](https://github.com/yuliss-vs/suscripciones-gym-frontend)
*   **Backend (Smart Contract en Rust/Anchor):** [https://github.com/yuliss-vs/proyecto-suscripciones-gym](https://github.com/yuliss-vs/proyecto-suscripciones-gym)

## Instrucciones de Ejecución Local
1. Clonar este repositorio.
2. Navegar a la carpeta del proyecto: `cd app-gym`
3. Instalar dependencias: `npm install`
4. Iniciar el servidor de desarrollo: `npm run dev`
5. Abrir el enlace local en el navegador y conectar tu Phantom Wallet (Devnet).
