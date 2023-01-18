import { Register, Subscribe, Unregister, Watch } from '../../types';
export declare class OnusCore {
    private contents;
    private emitter;
    getRegistry: (name: string) => unknown;
    /**
     * subscribe - Subscribe to a named content block
     * @param {string} name | name of the element to subscribe to
     * @param {function} callback | function to call when element is found
     */
    subscribe: Subscribe;
    /**
     * watch - Watch the blocks being registered
     * @param {function} callback |  fucntion to call when element is registered
     * @returns {function} cleanup function to remove event listener
     */
    watch: Watch;
    /**
     * register - Register content for a named block with a priority
     * @param {object} props | the props passed to SetElement
     * @param {number} location | POSITION_PREPEND, POSITION_APPEND, or POSITION_DEFAULT
     */
    register: Register;
    /**
     * unregister - Remove element from registry
     * @param {string} name | name of the element to remove
     * @param {number} priority | determines the instance to remove
     */
    unregister: Unregister;
    /**
     * Trigger the deepest element to render
     * @param {string} name | name of the element to find highest priority of and trigger rendering
     */
    private triggerDeepest;
    private findDeepest;
}
