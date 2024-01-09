# windowResizeObserver

![Static Badge](https://img.shields.io/badge/version-1-blue)

Manage and perform actions when a browser window is resized, e.g. hide popovers, dropdowns, and such.

Use `WindowResizeObserver.js` to add or remove functions in a queue, edit the order of operations, and control how often the queue can run. See the demo file `index.html` or the live demo page for an example of how it works.

## Live Demo

[https://danaildichev.net/portfolio/code-samples/window-resize-observer](https://danaildichev.net/portfolio/code-samples/window-resize-observer)

## Install

Get a copy of `WindowResizeObserver.js` and instantiate a new class.

```javascript
<script src="path/to/WindowResizeObserver.js"></script>
<script>

    /**
    * @param {Boolean} [once] Perform all actions once. Default false.
    * @param {Number} [queueDelay] Milliseconds before enqueueing again. Default 0 - does not requeue.
    */
    const ResizeObserver = new WindowResizeObserver(true, 1000);

</script>
```

## Usage

Options for construction

```javascript
// run the action queue once per second
const ResizeObserver = new WindowResizeObserver(true, 1000);

// run the action queue once. (the page has to be reloaded for it to run again)
const ResizeObserver = new WindowResizeObserver(true);
```

Registering a list of functions
```javascript
function test1() { console.log('performed test function 1'); }
function test2() { console.log('performed test function 2'); }
function test3() { console.log('performed test function 3'); }

ResizeObserver.append(test1);
ResizeObserver.append(test2);
ResizeObserver.append(test3);
```

## API

### Observe your action queue

| Function | Description | Options |
| --- | --- | --- |
| `dumpActionNames()` | Get action queue as a string | Pass in `true` to get a shallow copy |
| `dumpActions()` | Log the action queue to the console | Pass in `true` to get a shallow copy |
| `dumpValues()` | Log each index and function definition to the console | Pass in `true` to get a shallow copy |
|  |  | If you pass in `true` as the second parameter, it will log function names instead of definitions |

### Manage your action queue

| Function | Description | Options |
| --- | --- | --- |
| `performActions()` | Trigger the queue |  |
| `prepend(action)` | Add a function to the beginning of the queue |  |
| `append(action)` | Add a function to the end of the queue |  |
| `replaceAction(action, newAction)` | Replace `action` with `newAction` |  |
| `replaceActionAt(pos, newAction)` | Replace the action at index `pos` with `newAction` |  |
| `swapActions(actionA, actionB)` | Swap the order in which 2 functions are performed |  |
| `swapActionsAt(posA, posB)` | Swap the order of 2 functions by their index |  |
| `clearQueue()` | Remove all functions from the list |  |
| `removeAction(action)` | Remove a function by its name |  |
| `removeActionAt(pos)` | Remove an action by it's index |  |
| `resetQueueDelay(delay)` | Enable, disable, or adjust the re-queue delay | `delay` is milliseconds |
|  |  | Pass in `0` to disable |
|  |  | Negative values are reset to 0 |
|  |  | Use a number greater than 0 to enable or adjust |

### Query your actions queue

| Function | Description | Options |
| --- | --- | --- |
| `getActions()` | Get the action queue | Pass in `true` to get a shallow copy |
| `getActionsLength()` | Get the number of actions in queue |  |
| `getIndexOf(action)` | Get the position of an action |  |
| `getActionAt(pos)` | Get the action at an index |  |

## Issues

Open an issue or hit me up.

## Contributing

PRs accepted.

## License

GPL-3.0
