import Hammer from '../../../node_modules/hammerjs/hammer';
class PullRefresh{
    init(contentEle,loadingEle,loadingFun){
        this.contentEle = contentEle;
        this.loadingEle = loadingEle;
        this.parentClass = this.contentEle.parentNode.classList;
        this.loadingFun = loadingFun;
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
        let _setParentClass = ()=>{
            if ( pan.distance > options.distanceToRefresh ) this.parentClass.add( 'ptr-refresh' );
            else this.parentClass.remove( 'ptr-refresh' );
        };
        let _resetStyle = ()=>{
            this.parentClass.remove( 'ptr-loading' );
            this.parentClass.remove( 'ptr-refresh' );
            this.parentClass.add( 'ptr-reset' );
            let parentClassRemove = ()=>{
                this.parentClass.remove( 'ptr-reset' );
                this.contentEle.parentNode.removeEventListener( 'transitionend', parentClassRemove, false );
            };
            this.contentEle.parentNode.addEventListener( 'transitionend', parentClassRemove, false );
        };
        let _loading = ()=>{
            this.parentClass.add( 'ptr-loading' );
            if ( !this.loadingFun ) {
                return _resetStyle();
            }
            let loadingPromise = this.loadingFun();
            setTimeout( function() {
                loadingPromise.then( _resetStyle );
            }, 1000 );
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
                _setParentClass();
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
                this.contentEle.style.transform = this.contentEle.style.webkitTransform = '';
                this.loadingEle.style.transform = this.loadingEle.style.webkitTransform = '';
                // if(pan.distance>options.distanceToRefresh){
                //     console.log("Do refresh");
                // }
                if ( this.parentClass.contains( 'ptr-refresh' ) ) _loading();
                else _resetStyle();
            }
        } );
        this.hammer = h;
    }
}

export default new PullRefresh();