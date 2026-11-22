import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const PROGRAM_ID = new PublicKey("J9dL6jC5u65vpaSafAG3xUqzPC8HUKhW6k9R2UbnAKDE");
const PDA_DIRECTA = new PublicKey("RDME1y8vC5FvJktMW19xJbHRbvQ7FYpP8PKncab96yA");

function GymApp() {
  const { connection } = useConnection();
  const wallet = useWallet();
  
  const [idUsuario, setIdUsuario] = useState("");
  const [planSeleccionado, setPlanSeleccionado] = useState("1");
  const [cargando, setCargando] = useState(false);

  const planes = [
    { id: "1", nombre: "Básico", precio: 10, color: "#3b82f6", desc: "Acceso a área general" },
    { id: "2", nombre: "Pro", precio: 20, color: "#8b5cf6", desc: "Acceso general + clases" },
    { id: "3", nombre: "Premium", precio: 30, color: "#ec4899", desc: "Acceso total + entrenador" }
  ];

  const handleSuscribirse = async (e) => {
    e.preventDefault();
    if (!wallet.publicKey) return alert("Conecta tu wallet primero.");
    if (!idUsuario) return alert("Ingresa un ID.");

    setCargando(true);
    try {
      const discriminator = Buffer.from([0x2b, 0xe1, 0xd2, 0x3b, 0xb3, 0xc5, 0x8b, 0x1a]); 
      const data = Buffer.alloc(11); 
      discriminator.copy(data, 0);
      data.writeUInt16LE(parseInt(idUsuario), 8);
      data.writeUInt8(parseInt(planSeleccionado), 10);

      const keys = [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: PDA_DIRECTA, isSigner: false, isWritable: true },
      ];

      const instruction = new TransactionInstruction({ keys, programId: PROGRAM_ID, data });
      const transaction = new Transaction().add(instruction);
      
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      alert("¡Suscripción exitosa! 🎉");
      setIdUsuario("");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%)', 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>🏋️‍♂️</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>
          Gym WayLearn
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '10px' }}>
          Tu gimnasio de confianza en la blockchain de Solana
        </p>
      </div>

      {/* MAIN CARD */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)',
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        width: '100%', 
        maxWidth: '600px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>Registro de Suscripción</h2>
          <WalletMultiButton style={{ backgroundColor: '#6366f1', borderRadius: '12px', fontWeight: 'bold' }} />
        </div>

        <form onSubmit={handleSuscribirse} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#334155', fontSize: '0.95rem' }}>
              ID de Usuario
            </label>
            <input 
              type="number" 
              placeholder="Ej. 5"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: '12px', 
                border: '2px solid #e2e8f0', 
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#94a3b8', display: 'block', marginTop: '6px' }}>Si eres nuevo, pon un número. Si ya tienes cuenta, pon tu ID.</small>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px', color: '#334155', fontSize: '0.95rem' }}>
              Selecciona tu Plan
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {planes.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setPlanSeleccionado(plan.id)}
                  style={{
                    padding: '15px',
                    borderRadius: '12px',
                    border: planSeleccionado === plan.id ? `2px solid ${plan.color}` : '2px solid #e2e8f0',
                    backgroundColor: planSeleccionado === plan.id ? `${plan.color}10` : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <h3 style={{ margin: 0, color: plan.color, fontSize: '1.1rem' }}>{plan.nombre}</h3>
                  <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#1e293b' }}>{plan.precio} <span style={{fontSize: '0.8rem', color: '#64748b'}}>Lamports</span></p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={cargando || !wallet.publicKey}
            style={{ 
              marginTop: '10px',
              padding: '16px', 
              backgroundColor: cargando ? '#94a3b8' : '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              cursor: cargando ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
            }}
          >
            {cargando ? 'Procesando...' : 'Suscribirme Ahora'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <GymApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}