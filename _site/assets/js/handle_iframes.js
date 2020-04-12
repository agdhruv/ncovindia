// source: https://stackoverflow.com/questions/819416/adjust-width-and-height-of-iframe-to-fit-with-content-in-it

function resizeIFrameToFitContent(iFrame, extraHeight) {
    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + extraHeight;
}

// window.addEventListener('DOMContentLoaded', function(e) {

//     // var iFrame = document.getElementById( 'iFrame1' );
//     // resizeIFrameToFitContent( iFrame );

//     // or, to resize all iframes:
//     var iframes = document.querySelectorAll("iframe");
//     for( var i = 0; i < iframes.length; i++) {
//         resizeIFrameToFitContent( iframes[i] );
//     }
// });