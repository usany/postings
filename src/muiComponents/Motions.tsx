import { motion } from 'framer-motion';

const Motions = () => {
    const slides = [
        { musician: '에픽하이 (EPIK HIGH)', title: '우산 (Feat. 윤하)'},
        { musician: '페퍼톤스(PEPPERTONES)', title: '우산'},
        { musician: 'NCT 127', title: '우산'},
        { musician: '비', title: "It's Raining"},
        { musician: '폴킴', title: '비'},
        { musician: '이클립스(ECLIPSE)', title: '소나기'},
        { musician: '헤이즈 (Heize)', title: '비도 오고 그래서 (Feat. 신용재)'},
        { musician: '럼블 피쉬', title: '비와 당신'},
        { musician: '비스트(Beast)', title: '비가 오는 날'},
        { musician: '김태우', title: '사랑비'},
        { musician: '에픽하이 (EPIK HIGH)', title: '비 오는 날 듣기 좋은 노래'},
        { musician: '김건모', title: '잠 못 드는 밤 비는 내리고'},
        { musician: '윤하', title: '비가 내리는 날에는'},
        { musician: '정인', title: '장마'},
        { musician: '김현식', title: '비처럼 음악처럼'},
        { musician: '아이오아이 (I.O.I)', title: '소나기'},
        { musician: '윤하', title: '소나기'},
        { musician: '부활', title: '소나기'},
        { musician: '에릭남(Eric Nam)', title: '소나기'},
        { musician: '이승철', title: '비가 와'},
        { musician: '장범준', title: '추적이는 여름 비가 되어'},
        { musician: '버스커 버스커', title: '소나기 (주르르루)'},
    ];
    
    let currentIndex = slides.length
    let randomIndex
    let temporaryValue
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1
        temporaryValue = slides[currentIndex];
        slides[currentIndex] = slides[randomIndex];
        slides[randomIndex] = temporaryValue;
    }
    
    // Duplicate the slides array to ensure seamless looping
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Wrapping div for seamless looping */}
            <motion.div
                className="flex"
                animate={{
                    x: ['0%', '-2100%'],
                    transition: {
                        ease: 'linear',
                        duration: 300,
                        repeat: Infinity,
                    }
                }}
            >
                {/* Render duplicated slides */}
                {duplicatedSlides.map((slide, index) => (
                    <span key={index} className="flex flex-shrink-0 px-5" 
                        // style={{ width: `${(slide.musician.length+slide.title.length)+300}px` }}
                    >
                        <span className="flex flex-col text-xl">
                            {slide.title} - {slide.musician}
                        </span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Motions;
