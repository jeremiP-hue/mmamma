import './App.css';
import { useEffect, useState } from 'react';
import pytania from './pytania';
import wyzwania from './wyzwania';

function App() {
  const [odp, setOdp] = useState('');
  const [pytanie, setPytanie] = useState('');
  const [odpowiedz, setOdpowiedz] = useState('');
  const [czyPoprawne, setCzyPoprawne] = useState(null);
  const [Hp, setHP] = useState(3);
  const [punkty, setPunkty] = useState(0);
  const [nagroda, setNagroda] = useState(true)

  const losuj = () => {
    const nrPytania = Math.floor(Math.random() * pytania.length);
    const obecnePytanie = pytania[nrPytania];

    setOdp(obecnePytanie.odp);
    setPytanie(obecnePytanie.pytanie);
    setOdpowiedz('');
  };
  const wygrana = () => {
    setPytanie("wygrana oto kod na prezent : `we sol` ")
  }

  const sprawdzOdpowiedz = () => {
    const wpisanaOdpowiedz = odpowiedz.trim().toLowerCase();
    const poprawnaOdpowiedz = odp.trim().toLowerCase();

    if (wpisanaOdpowiedz === poprawnaOdpowiedz && Hp > 0) {
      const nowePunkty = punkty + 1;

      setCzyPoprawne(true);
      setPunkty(nowePunkty);

      if (nowePunkty > 20) {
        wygrana();
        setOdpowiedz('');
        return;
      }

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










  const sprawdzWyzwanie = () => {
    const wpisanaOdpowiedz = odpowiedz.trim().toLowerCase();
    const poprawnaOdpowiedz = odp.trim().toLowerCase();

    if (wpisanaOdpowiedz === poprawnaOdpowiedz && Hp > 0) {
      const nowePunkty = punkty + 5;

      setCzyPoprawne(true);
      setPunkty(nowePunkty);

      if (nowePunkty > 20) {
        wygrana();
        setOdpowiedz('');
        return;
      }

      losuj();
    } else {

      setCzyPoprawne(false);
      setHP((h) => {
        const noweHp = h - 3;

        if (noweHp <= 0) {
          localStorage.clear();
          setPytanie("przegrana");
          return 0;
        }
        setNagroda(true)
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
  const pytanienag = () => {
    sprawdzOdpowiedz()
  }
  const sprawdz = () => {
        nagroda ? pytanienag() : sprawdzWyzwanie();
  }


  useEffect(() => {

    losuj();
  }, []);
  const wyzwanie = () => {
    setNagroda(false)
    const nrWyzwania = Math.floor(Math.random() * wyzwania.length);
    const obecneZadanei = wyzwania[nrWyzwania];

    setOdp(obecneZadanei.chaslo);
    setPytanie(obecneZadanei.zadanie);
    setOdpowiedz('');
  }

  const serca = [];
  for (let i = 0; i < Hp; i++) {
    serca.push(<img key={i} src="/serce.svg" alt="serce" className="serce" />);
  }

  return (
    <div className="App">
      {serca}
      <h1 className="tytl">QUIZ NA DZIEŃ TATY</h1>
      <h2>{pytanie}</h2>
      <h3>Punkty: {punkty}</h3>
      <input
        value={odpowiedz}
        onChange={(e) => setOdpowiedz(e.target.value)}
      />
      <button onClick={sprawdz} className='odp'>odpowiedz</button>
      <button onClick={zapisz}>zapisz</button>
      <button onClick={zaladuj}>zaladuj</button>
      <button onClick={wyzwanie}>wyzwanie</button>


      {czyPoprawne === true && <p>Dobrze!</p>}
      {czyPoprawne === false && <p>Spróbuj jeszcze raz.</p>}
    </div>
  );
}

export default App;
