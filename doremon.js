const music = new Audio('Songs/doremon/3.mp3');
// music.play();
document.title = "MusicPanda"

const songs = [
    {
        id: "1",
        songName: `Karma
    <br>
    <div class="subtitle" > Ma hu Mogambo</div>`,
        poster: "Images/doremon/1.jpg",
    },
    {
        id: "2",
        songName: `Are you with me
    <br>
    <div class="subtitle" > Spider Monkey</div>`,
        poster: "Images/doremon/2.jpg",
    },
    {
        id: '3',
        songName: `RPM
    <br>
    <div class="subtitle">Alein X</div>`,
        poster: "Images/doremon/3.jpg",
    },
    {
        id: 4,
        songName: `Baby
    <br>
    <div class="subtitle">Four Arms</div>`,
        poster: "Images/doremon/4.jpg",
    },
    {
        id: 5,
        songName: `Sold Dream
    <br>
    <div class="subtitle">XLR8</div>`,
        poster: "Images/doremon/5.jpg",
    },
    {
        id: 6,
        songName: `Aktiv
    <br>
    <div class="subtitle">Satoru Gojo</div>`,
        poster: "Images/doremon/6.jpg",
    },
    {
        id: 7,
        songName: `Devil
    <br>
    <div class="subtitle">Saktimaan</div>`,
        poster: "Images/doremon/7.jpg",
    },
    {
        id: 8,
        songName: `Never have i felt this
    <br>
    <div class="subtitle">Pikachu</div>`,
        poster: "Images/doremon/8.jpg",
    },
    {
        id: 9,
        songName: `Everything I got
    <br>
    <div class="subtitle">echo echo</div>`,
        poster: "Images/doremon/9.jpg",
    },
    {
        id: 10,
        songName: `Doremon
    <br>
    <div class="subtitle">Doremon</div>`,
        poster: "Images/doremon/10.jpg",
    },
    
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});

// searchdata start

let search_result = document.getElementsByClassName('search_result')[0];
songs.forEach(element => {
    const { id, songName, poster } = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
                        <div class="content">
                            ${songName}
                        </div>
    `;
    search_result.appendChild(card);
});
let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();
    let items = search_result.getElementsByTagName('a')
    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;
        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = "flex";
        } else {
            items[index].style.display = "none";

        }
        if (input.value == 0) {
            search_result.style.display = "none";
        } else {
            search_result.style.display = "";

        }

    }
})

// searchdata end

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');


masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.add("fa-pause");
        masterPlay.classList.remove("fa-play");


    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");

    }
});

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add("fa-circle-play");
        el.classList.remove("fa-circle-pause");
        
    })
};
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, .0)';
    });
};

let index = 0;
let poster_master_play = document.getElementById('poster_master_play'); 
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');


Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `Songs/doremon/${index}.mp3`;
        poster_master_play.src = `Images/doremon/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        download_music.href = `Songs/doremon/${index}.mp3`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });


        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);


        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.remove('fa-circle-play');               
        el.target.classList.add('fa-circle-pause'); 
        wave.classList.add('active1'); 

    });
});





let currentstart = document.getElementById('currentstart');
let currentend = document.getElementById('currentend');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];



music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    // console.log(misic_dur);
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }

    currentend.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentstart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    // console.log(seek);
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});
seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.add('fa-volume-off');
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');


    }
    if (vol.value > 0) {
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.add('fa-volume-low');
        vol_icon.classList.remove('fa-volume-off');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.remove('fa-volume-off');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;

});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `Songs/doremon/${index}.mp3`;
    poster_master_play.src = `Images/doremon/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    wave.classList.add('active1');

});
next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `Songs/doremon/${index}.mp3`;
    poster_master_play.src = `Images/doremon/${index}.jpg`;

    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    wave.classList.add('active1');

});






let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});
let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let item = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', () => {
    item.scrollLeft += 330;
});
pop_art_left.addEventListener('click', () => {
    item.scrollLeft -= 330;
});

let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;
    switch (a) {
        case "next":
            shuffle.classList.add('fa-repeat');
            shuffle.classList.remove('fa-music');
            shuffle.classList.remove('fa-shuffle');
            shuffle.innerHTML = 'repeat';

            break;
        case "repeat":
            shuffle.classList.remove('fa-repeat');
            shuffle.classList.remove('fa-music');
            shuffle.classList.add('fa-shuffle');
            shuffle.innerHTML = 'random';
            break;

        case "random":
            shuffle.classList.remove('fa-repeat');
            shuffle.classList.add('fa-music');
            shuffle.classList.remove('fa-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }

});

const next_music = () => {
    if (index == songs.length) {
        index = 1

    } else {
        index++;

    }
    music.src = `Songs/doremon/${index}.mp3`;
    poster_master_play.src = `Images/doremon/${index}.jpg`;

    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    download_music.href = `Songs/doremon/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);


    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    wave.classList.add('active1');
};

const repeat_music = () => {
    index;
    music.src = `Songs/doremon/${index}.mp3`;
    poster_master_play.src = `Images/doremon/${index}.jpg`;

    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    download_music.href = `Songs/doremon/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);


    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();

    wave.classList.add('active1');
};

const random_music = () => {
    if (index == songs.length) {
        index = 1

    } else {
        index = Math.floor((Math.random() * songs.length) + 1);

    };
    music.src = `Songs/doremon/${index}.mp3`;
    poster_master_play.src = `Images/doremon/${index}.jpg`;

    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    download_music.href = `Songs/doremon/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);


    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    wave.classList.add('active1');
};

music.addEventListener('ended', () => {
    let b = shuffle.innerHTML;
    switch (b) {
        case 'repeat_music()':

            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
    }
});

