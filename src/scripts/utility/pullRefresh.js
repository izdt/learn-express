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
        let options = {
            resistance: 5,
            distanceToRefresh: 30
        };
        let pan = {
            enabled: false,
            distance: 0,
            startingPositionY: 0
        };
        let h = new Hammer(this.contentEle);
        let  _setContentPan = () => {
            this.contentEle.style.transform = this.contentEle.style.webkitTransform = 'translate3d( 0, ' + pan.distance + 'px, 0 )';
            this.loadingEle.style.transform = this.loadingEle.style.webkitTransform = 'translate3d( 0, ' + ( pan.distance - this.loadingEle.offsetHeight ) + 'px, 0 )';
        };
        
		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );
		h.on( 'panstart', (e)=>{
            pan.enabled = this.contentEle.scrollTop==0;
            console.log("panStart");
            //console.log(e);
        } );
		h.on( 'pandown', (e)=>{
            //console.log(e.distance);
            e.preventDefault();
            pan.distance = e.distance / options.resistance;
            if(pan.enabled){
                _setContentPan();
            } else
            this.contentEle.scrollTop-=pan.distance;
        } );
		h.on( 'panup', (e)=>{
            e.preventDefault();
            pan.distance = e.distance / options.resistance;
            this.contentEle.scrollTop+=pan.distance;
        } );
		h.on( 'panend', (e)=>{
            e.preventDefault();
            if(pan.enabled){
                if(pan.distance>options.distanceToRefresh){
                    console.log("Do refresh");
                }
            }
        } );
        this.hammer = h;
    }
}

export default new PullRefresh();