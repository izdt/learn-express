import Hammer from '../../../node_modules/hammerjs/hammer';
class PullRefresh{
    init(contentEle,loadingEle){
        this.contentEle = contentEle;
        this.loadingEle = loadingEle;
        this.initHammer();
    }
    initHammer(){
        if ( ! this.contentEle || ! this.loadingEle ) {
			return false;
		}
        let options = {};
        let pan = {
            enabled: false,
            distance: 0,
            startingPositionY: 0
        };
        let _panStart = function(e){
            console.log("panStart");
            console.log(e);
        };
        let _panDown = function(e){
            console.log(e.distance);
            document.body.scrollTop+=e.distance;
            // console.log("panDown");
            // console.log(e);
        };
        let _panUp = function(e){
            document.body.scrollTo-=e.distance;
            // console.log("panUp");
            // console.log(e);
        };
        let _panEnd = function(e){
            console.log("panEnd");
            console.log(e);
        };
        let h = new Hammer(this.contentEle);
		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );
		h.on( 'panstart', _panStart );
		h.on( 'pandown', _panDown );
		h.on( 'panup', _panUp );
		h.on( 'panend', _panEnd );
        this.hammer = h;
    }
}

export default new PullRefresh();