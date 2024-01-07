class WindowResizeObserver
{
    /**
     *
     * @param {Boolean} [once] Perform all actions once. Default false.
     * @param {Number} [queueDelay] Milliseconds before enqueueing again. Default 0 - does not requeue.
     *
     */
    constructor(once = false, queueDelay = 0)
    {
        this.actions = [];
        this.once = once;
        this.queueDelay = queueDelay;
        this.enqueueActions();
    }


    /**
     *
     * Assign 'resize' listener to window that will run the main function
     *
     * @return {undefined}
     */
    enqueueActions()
    {
        window.addEventListener('resize', (event) =>
        {
            this.performActions();

        }, { once: this.once });
    }


    /**
     * Change action enqueue delay or turn it off by setting it to 0
     *
     * @param {Number} queueDelay Milliseconds delay before enqueueing action list again.
     *
     * @return {undefined}
     */
    resetQueueDelay(queueDelay)
    {
        if (queueDelay > 0) { this.enqueueActions(); }
        else { this.queueDelay = 0; }
    }


    /**
     *
     * main: do each action then put the actions back in queue
     *
     * @return {undefined}
     *
     */
    performActions()
    {
        this.actions.forEach( (action) => { action(); } );
        if (this.queueDelay)
        {
            setTimeout(() => { this.enqueueActions(); }, this.queueDelay);
        }
    }


    /**
     * Get the actions list
     *
     * @param {Boolean} [asShallowCopy] Optional. Default false.
     *
     * @return {*[]|[]}
     */
    getActions(asShallowCopy = false)
    {
        // return this.actions;
        return (asShallowCopy) ? [...this.actions] : this.actions;
    }


    /**
     * Get length of list of actions
     *
     * @return {Number}
     */
    getActionsLength() { return this.actions.length; }


    /**
     * Get an action at an index
     *
     * @param {Number} pos
     *
     * @return {Function}
     */
    getActionAt(pos) { return this.actions[pos]; }


    /**
     * Get the index of an action by its name
     *
     * @param {Function} action
     *
     * @return {number}
     */
    getIndexOf(action)
    {
        const pos = this.actions.indexOf(action);

        if(pos >= 0) { return pos; }
        else { console.error(`No index found for ${action.name}.`); }
    }


    /**
     * Push to actions array
     *
     * @param {Function} action
     *
     * @return {undefined}
     */
    append(action) { this.actions.push(action); }


    /**
     * Unshift to actions array
     *
     * @param {Function} action
     *
     * @return {undefined}
     */
    prepend(action) { this.actions.unshift(action); }


    /**
     * Replace an action at an index
     *
     * @param {Number} pos
     * @param {Function} newAction
     *
     * @return {undefined}
     */
    replaceActionAt(pos, newAction)  { this.actions[pos] = newAction; }


    /**
     * Replace an action by its name
     *
     * @param {Function} action
     * @param {Function} newAction
     *
     * @return {undefined}
     */
    replaceAction(action, newAction)
    {
        const pos = this.getIndexOf(action);
        if ( pos >= 0) { this.replaceActionAt(pos, newAction); }
        else { console.error(`Unable to swap ${action} for ${newAction}. No index found for ${action}.`); }
    }


    /**
     * Swap positions of two actions
     *
     * @param {Number} posA Index of an action to be swapped
     * @param {Number} posB Index of an action to be swapped
     *
     * @return {undefined}
     */
    swapActionsAt(posA, posB)
    {
        if (this.actions[a] && this.actions[b])
        {
            [this.actions[a], this.actions[b]] = [this.actions[b], this.actions[a]];
        }

        else
        {
            if (this.actions[a] === undefined && this.actions[b] === undefined)
            {
                console.error(`Attempting to swap with undefined indices: [${a}] and [${b}].`)
            }

            if(this.actions[a] === undefined && this.actions[b] !== undefined)
            {
                console.error(`Attempting to swap [${b}] with an undefined index [${a}].`)
            }

            if(this.actions[b] === undefined && this.actions[a] !== undefined)
            {
                console.error(`Attempting to swap [${a}] with an undefined index [${b}].`)
            }
        }
    }


    /**
     * Get index positions of functions a and b and passes them to swapActionsAt()
     *
     * @param {Function} actionA A function to swap
     * @param {Function} actionB A function to swap
     */
    swapActions(actionA, actionB)
    {
        const posA = this.getIndexOf(a);
        const posB = this.getIndexOf(b);
        this.swapActionsAt(posA, posB);
    }


    /**
     * Remove a function from list of actions by index
     *
     * @param {number} pos
     *
     * @return {undefined}
     */
    removeActionAt(pos) { this.actions.splice(pos, 1); }


    /**
     * Remove a function from list of actions by name
     *
     * @param {Function} action
     *
     * @return {undefined}
     */
    removeAction(action) { this.removeActionAt( this.getIndexOf(action) ); }


    /**
     * Reset the action queue to an empty array
     *
     * @return undefined
     */
    clearQueue()
    {
        this.actions = [];
    }


    /**
     * Log the list of actions
     *
     * @param {Boolean} asShallowCopy Default false
     *
     * @return {undefined}
     */
    dumpActions(asShallowCopy = false)
    {
        console.log(this.getActions(asShallowCopy));
    }


    /**
     * Log the action list's indices and (functions or function names)
     *
     * @param {boolean} asShallowCopy Default false
     * @param {boolean} namesOnly Default false
     *
     * @return {undefined}
     */
    dumpValues(asShallowCopy = false, namesOnly = false)
    {
        const current = this.getActions(asShallowCopy);
        if (namesOnly) { for (const i in current) { console.log(`${i}: ${current[i].name}`); } }
        else { for (const i in current) { console.log(`${i}: ${current[i]}`); } }
    }

    /**
     * Log the action list formatted as a string
     *
     * @param {Boolean} asShallowCopy Default false
     *
     * @return {undefined}
     */
    dumpActionNames(asShallowCopy = false)
    {
        const current = this.getActions(asShallowCopy);
        const names = this.actionNamesToString(current);
        console.log(names);
    }


    /**
     * Build a string from the names of the functions in the action list
     *
     * @param {Array} actionsList
     * @return {String}
     */
    actionNamesToString(actionsList)
    {
        // get each function name
        const names = [];
        for (const action of actionsList) { names.push(action.name) }

        // return them as a string
        return '[' + names.join(', ') + ']';
    }

}
