import './App.css';
import { useEffect, useState } from 'react';
import pytania from './pytania';

function App() {
  const [odp, setOdp] = useState('');
  const [pytanie, setPytanie] = useState('');
  const [odpowiedz, setOdpowiedz] = useState('');
  const [czyPoprawne, setCzyPoprawne] = useState(null);
  const [Hp, setHP] = useState(3);
  const [punkty, setPunkty] = useState(0);

  const losuj = () => {
    const nrPytania = Math.floor(Math.random() * pytania.length);
    const obecnePytanie = pytania[nrPytania];

    setOdp(obecnePytanie.odp);
    setPytanie(obecnePytanie.pytanie);
    setOdpowiedz('');
  };
  const wygrana = () => {
    setPytanie("wygrana oto kod na prezent : `you win` ")
  }

  const sprawdzOdpowiedz = () => {
    const wpisanaOdpowiedz = odpowiedz.trim().toLowerCase();
    const poprawnaOdpowiedz = odp.trim().toLowerCase();
    if(punkty > 10){
      wygrana()
    }

    if (wpisanaOdpowiedz === poprawnaOdpowiedz && Hp > 0) {
      setCzyPoprawne(true);
      setPunkty((p) => p + 1);
      losuj();
    } else {

      setCzyPoprawne(false);
      setHP((h) => {
        const noweHp = h - 1;

        if (noweHp <= 0) {
          localStorage.clear();
          setPytanie("przegrana");
          return 0;
        }

        return noweHp;
      });
    }
  };
  const zapisz = () => {
    localStorage.setItem("iloscpunktow", punkty);
    localStorage.setItem("iloscHP", Hp)
   }
   const zaladuj = () => {
    const zapisanePunkty = localStorage.getItem("iloscpunktow");
    setPunkty(zapisanePunkty === null ? 0 : Number(zapisanePunkty));

    const zapisanHp = localStorage.getItem("iloscHp");
    setPunkty(zapisanHp === null ? 0 : Number(zapisanePunkty));
   }
   

  useEffect(() => {
    losuj();
  }, []);

  const serca = [];
  for (let i = 0; i < Hp; i++) {
    serca.push(<img key={i} src="/serce.svg" alt="serce" className="serce" />);
  }

  return (
    <div className="App">
      {serca}
      <h1 className="tytl">QUIZ NA DZIEŃ MAMY</h1>
      <h2>{pytanie}</h2>
      <h3>Punkty: {punkty}</h3>
      <input
        value={odpowiedz}
        onChange={(e) => setOdpowiedz(e.target.value)}
      />
      <button onClick={sprawdzOdpowiedz}>odpowiedz</button>
      <button onClick={zapisz}>zapisz</button>
      <button onClick={zaladuj}>zaladuj</button>

      
      {czyPoprawne === true && <p>Dobrze!</p>}
      {czyPoprawne === false && <p>Spróbuj jeszcze raz.</p>}
    </div>
  );
}

export default App;
