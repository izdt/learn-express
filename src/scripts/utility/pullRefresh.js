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
        let h = new Hammer(this.contentEle);
		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );
		h.on( 'panstart', (e)=>{
            console.log("panStart");
            //console.log(e);
        } );
		h.on( 'pandown', (e)=>{
            console.log(e.distance);
            this.contentEle.scrollTop-=e.distance;
        } );
		h.on( 'panup', (e)=>{
            this.contentEle.scrollTop+=e.distance;
        } );
		h.on( 'panend', (e)=>{
            console.log("panEnd");
            //console.log(e);
        } );
        this.hammer = h;
    }
}

export default new PullRefresh();