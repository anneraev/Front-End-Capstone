import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import "./MessageCarousel.css"
const source = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2000px-Solid_grey.svg.png"

export default class MessageCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, issueIndex: this.props.currentIssueId };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    getItems = () => {
        this.items = this.props.messages.filter(message => message.issueId === parseInt(this.props.currentIssueId) && message.active === true).map(message => {
            return {
                src: source,
                altText: message.content,
                caption: message.content,
                id: message.id,
            }
        })
        if (this.props.currentIssueId !== this.state.issueIndex) {
        const newIndex = {issueIndex: this.props.currentIssueId, activeIndex: 0}
        this.setState(newIndex)
        console.log("setting new carousel state")
        }
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        this.getItems()
        console.log("carousel props", this.props)
        console.log("carousel state", this.state)
        const { activeIndex } = this.state;

        const slides = this.items.map(item => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.id}
                >
                    <div className="container">
                    <img className="slide-image" src={item.src} alt={item.altText} width="1024" height="786"/>
                    <p className="item-text">{item.caption}</p>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={this.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}