window.onload = function () {
    $.getJSON('data/avatars-character-defining-words.json', (resultsData) => {
        var wordsData = resultsData[0];
        var countData = resultsData[1];
        var sentimentData = resultsData[2];
        
        var swiperWrapperAll = $('.swiper-wrapper-all');
        var swiperWrapperIndividual = $('.swiper-wrapper-individual');
        $.each(wordsData, (c, cResults) => {
            var wordsHtml = cResults['all'].map(
                (word) => `<p class="swiper-slide-words-word"><span class="swiper-slide-words-word-span">${word}</span></p>`
            ).join('\n');
            var img = c.toLowerCase().replace(' ', '-');
            swiperWrapperAll.append(
                `<div class="swiper-slide">
                <figure class="swiper-slide-image image is-48x48">
                    <img src="images/${img}.png">
                </figure>
                <p class="swiper-slide-text" style="bottom: 53.6667px;">${c}</p>
                <div class="swiper-slide-words">
                    ${wordsHtml}
                </div>
            </div>`
            );
            if (['Aang', 'Iroh', 'Katara', 'Sokka', 'Zuko'].includes(c)) {
                var seasonsHtml = ['1', '2', '3'].map((season) => {
                    var seasonWordsHtml = cResults[season].map(
                        (word) => `<p class="swiper-slide-words-word"><span class="swiper-slide-words-word-span">${word}</span></p>`
                    ).join('\n');
                    return `
                <div class="column is-one-third">
                    <div class="swiper-slide-seasons-season">
                        <p class="has-text-black is-size-5 has-text-weight-bold mt-3">S${season}</p>
                        ${seasonWordsHtml}
                    </div>
                </div>`
                }).join('\n');
                swiperWrapperIndividual.append(
                    `<div class="swiper-slide">
                        <figure class="swiper-slide-image image is-48x48">
                            <img src="images/${img}.png">
                        </figure>
                        <p class="swiper-slide-text" style="bottom: 53.6667px;">${c}</p>
                    <div class="columns is-mobile swiper-slide-seasons ${c}">
                        ${seasonsHtml}
                    </div>
                </div>`
                );
            }
        });

        var wordCountOptions = {
            series: [{
                name: 'S1',
                data: countData['S1']
            }, {
                name: 'S2',
                data: countData['S2']
            }, {
                name: 'S3',
                data: countData['S3']
            }],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    },
                    dataLabels: {
                        formatter: (y, _) => {
                            if (y < 1000) return y;
                            return `${Math.round(y / 100) / 10}k`
                        },
                        style: {
                            fontSize: '11px',
                            fontWeight: 'normal'
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: (y, _) => {
                                if (y < 1000) return y;
                                return `${Math.round(y / 100) / 10}k`
                            }
                        },
                        title: {
                            text: 'Word count',
                            style: {
                                fontWeight: 'normal'
                            }
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (y, _) => y
                        }
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'category',
                categories: countData['characters'],
            },
            yaxis: {
                title: {
                    text: 'Word count',
                    style: {
                        fontWeight: 'normal'
                    }
                }
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        };
        var wordCountChart = new ApexCharts(document.querySelector('#word-count-chart'), wordCountOptions);
        wordCountChart.render();

        var sentimentOptions = {
            series: [{
                name: 'Positive lines',
                data: sentimentData['pos']
            },
            {
                name: 'Negative lines',
                data: sentimentData['neg']
            }],
            chart: {
                type: 'bar',
                height: 440,
                stacked: true,
            },
            colors: ['#008FFB', '#FF4560'],
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return Math.abs(y * 100).toFixed(1) + "%";
                    }
                },
                title: {
                    text: 'Fraction of +/- lines',
                    style: {
                        fontWeight: 'normal'
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: sentimentData['characters'],
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    },
                }
            }]
        };

        var sentimentChart = new ApexCharts(document.querySelector('#sentiment-chart'), sentimentOptions);
        sentimentChart.render();
    });

    var swiper = new Swiper('.swiper-container-all', {
        pagination: '.swiper-pagination',
        keyboardControl: true,
        mousewheelControl: true,
        mousewheelForceToAxis: true,
        centeredSlides: true,
        freeMode: true,
        speed: 400,
        watchSlidesVisibility: true,
        longSwipes: false,
        freeModeSticky: true,
        slideToClickedSlide: true,
        preventClicks: true,
        preventClicksPropagation: true,
        mousewheelInvert: true,
        grabCursor: true,
        slidesPerView: 'auto',
        scrollbarHide: true,
        roundLengths: true,
        initialSlide: 15,
        watchSlidesProgress: true,
        spaceBetween: 0,
        observer: true,
    })
        .on('onSliderMove', function (swiper, event) {
            swiper.update(true);
        });

    var swiper = new Swiper('.swiper-container-individual', {
        pagination: '.swiper-pagination',
        keyboardControl: true,
        mousewheelControl: true,
        mousewheelForceToAxis: true,
        centeredSlides: true,
        freeMode: true,
        speed: 400,
        watchSlidesVisibility: true,
        longSwipes: false,
        freeModeSticky: true,
        slideToClickedSlide: true,
        preventClicks: true,
        preventClicksPropagation: true,
        mousewheelInvert: true,
        grabCursor: true,
        slidesPerView: 'auto',
        scrollbarHide: true,
        roundLengths: true,
        initialSlide: 2,
        watchSlidesProgress: true,
        spaceBetween: 0,
        observer: true,
    })
        .on('onSliderMove', function (swiper, event) {
            swiper.update(true);
        });

}