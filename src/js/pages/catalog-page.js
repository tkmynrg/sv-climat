import 'ion-rangeslider';


export function initCatalogPageLanding() {
    const $desktopRangeSlider = $("#range_slider");
    const $minPriceDesktopInput = $('#min_price_desktop_input');
    const $maxPriceDesktopInput = $('#max_price_desktop_input');
    const $minPriceMobileInput = $('#min_price_mobile_input');
    const $maxPriceMobileInput = $('#max_price_mobile_input');

    let FILTER_SETTINGS = {
        minPrice: 10000,
        maxPrice: 99999,
    };

    let $desktopRangeSliderInstance = null;
    let $mobileRangeSliderInstance = null;

    initRangeSlider();

    function initRangeSlider() {
        let currentMinValue = FILTER_SETTINGS.minPrice;
        let currentMaxValue = FILTER_SETTINGS.maxPrice;

        $desktopRangeSlider.ionRangeSlider({
            skin: 'round',
            type: "double",
            min: FILTER_SETTINGS.minPrice,
            max: FILTER_SETTINGS.maxPrice,
            from: currentMinValue,
            to: currentMaxValue,
            grid: false,
            hide_min_max: true,
            hide_from_to: true,
            onChange: (data) => {
                $minPriceDesktopInput.add($minPriceMobileInput).val(data.from);
                $maxPriceDesktopInput.add($maxPriceMobileInput).val(data.to);
                $mobileRangeSliderInstance.update(data);
            },
        });

        $desktopRangeSliderInstance = $desktopRangeSlider.data("ionRangeSlider");

        $minPriceDesktopInput.val(currentMinValue);
        $maxPriceDesktopInput.val(currentMaxValue);
        $minPriceMobileInput.val(currentMinValue);
        $maxPriceMobileInput.val(currentMaxValue);

        $minPriceDesktopInput.add($minPriceMobileInput).on('change', function () {
            let currentInputVal = +$(this).val();
            //связываем моб и десктопный инпуты
            $minPriceDesktopInput.add($minPriceMobileInput).val(currentInputVal);

            //если введённое значение меньше минимального
            if (currentInputVal < FILTER_SETTINGS.minPrice) {
                $minPriceDesktopInput.add($minPriceMobileInput).val($minPriceDesktopInput.val());

                $desktopRangeSliderInstance.update({
                    from: FILTER_SETTINGS.minPrice
                });

                $mobileRangeSliderInstance.update({
                    from: FILTER_SETTINGS.minPrice
                });

                return;
            }

            //если введённое значение больше максимального или больше выбранного макс значения
            if (currentInputVal > FILTER_SETTINGS.maxPrice || currentInputVal > $maxPriceDesktopInput.val()) {
                $minPriceDesktopInput.add($minPriceMobileInput).val($maxPriceDesktopInput.val());

                $desktopRangeSliderInstance.update({
                    from: FILTER_SETTINGS.maxPrice
                });

                $mobileRangeSliderInstance.update({
                    from: FILTER_SETTINGS.maxPrice
                });

                return;
            }

            $desktopRangeSliderInstance.update({
                from: +$(this).val()
            })

            $mobileRangeSliderInstance.update({
                from: +$(this).val()
            })

        });

        $maxPriceDesktopInput.add($maxPriceMobileInput).on('change', function () {
            let currentInputVal = +$(this).val();
            //связываем моб и десктопный инпуты
            $maxPriceDesktopInput.add($maxPriceMobileInput).val(currentInputVal);

            //если введённое значение меньше минимального
            if (currentInputVal > FILTER_SETTINGS.maxPrice) {
                $maxPriceDesktopInput.add($maxPriceMobileInput).val($maxPriceDesktopInput.val());

                $desktopRangeSliderInstance.update({
                    to: FILTER_SETTINGS.maxPrice
                });

                $mobileRangeSliderInstance.update({
                    to: FILTER_SETTINGS.maxPrice
                });


                return;
            }

            //если введённое значение меньше минимального или меньше выбранного минимума
            if (currentInputVal < FILTER_SETTINGS.minPrice || currentInputVal < $minPriceDesktopInput.val()) {
                $maxPriceDesktopInput.add($maxPriceMobileInput).val($minPriceDesktopInput.val());

                $desktopRangeSliderInstance.update({
                    to: +$minPriceDesktopInput.val()
                });
                $mobileRangeSliderInstance.update({
                    to: +$minPriceMobileInput.val()
                });

                return;
            }

            $desktopRangeSliderInstance.update({
                to: +$(this).val()
            });

            $mobileRangeSliderInstance.update({
                to: +$(this).val()
            });


        })

    }



}