import VideoActivityGroup from './VideoActivityGroup';
import MultichoiceActivityGroup from './MultichoiceActivityGroup';
import PhrasesActivityGroup from './PhrasesActivityGroup';
import DragAndDropActivityGroup from './DragAndDropActivityGroup';
import WordActivityGroup from './WordActivityGroup';

export default class UserActivities {
    dragAndDropActivityGroup: DragAndDropActivityGroup;
    multichoiceActivityGroup: MultichoiceActivityGroup;
    phrasesActivityGroup: PhrasesActivityGroup;
    videoActivityGroup: VideoActivityGroup;
    wordActivityGroup: WordActivityGroup;
}