
function Chart() {
    return (

        <>

            <div class="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
                <div class="inline-flex items-center">
                    <span class="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
                    <span class="text-[13px] text-gray-600 dark:text-neutral-400">
                        Income
                    </span>
                </div>
                <div class="inline-flex items-center">
                    <span class="size-2.5 inline-block bg-purple-600 rounded-sm me-2"></span>
                    <span class="text-[13px] text-gray-600 dark:text-neutral-400">
                        Outcome
                    </span>
                </div>
            </div>


            <div id="hs-curved-area-charts"></div>
        </>
    )
}
export default Chart;